
import { EXTERNAL_LINKS } from "../app/dsgvo-ampel/config/links";

/**
 * Recursively extracts all string values (URLs) from an object.
 */
function extractUrls(obj: any): { key: string; url: string }[] {
  const urls: { key: string; url: string }[] = [];

  for (const key in obj) {
    const value = obj[key];
    if (typeof value === "string") {
      if (value.startsWith("http")) {
        urls.push({ key, url: value });
      }
    } else if (typeof value === "object" && value !== null) {
      const subUrls = extractUrls(value);
      subUrls.forEach((u) => urls.push({ key: `${key}.${u.key}`, url: u.url }));
    }
  }
  return urls;
}

async function checkLinks() {
  console.log("🔍 Starting Link Validation...");
  const links = extractUrls(EXTERNAL_LINKS);
  let errors = 0;

  console.log(`Found ${links.length} links to check.\n`);

  for (const item of links) {
    try {
      // Use standard fetch with User-Agent to avoid 403/400 from strict servers (BSI, BMI)
      const response = await fetch(item.url, { 
        method: "HEAD",
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        }
      });
      
      const status = response.status;
      const ok = response.ok; // 200-299

      if (ok) {
        console.log(`✅ [${status}] ${item.key}`);
      } else {
        // Some servers reject HEAD, try GET
        if (status === 405 || status === 403 || status === 400) {
            console.log(`⚠️  [${status}] ${item.key} - Retrying with GET...`);
            const getResp = await fetch(item.url, {
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
                }
            });
            if(getResp.ok) {
                console.log(`✅ [${getResp.status}] ${item.key} (via GET)`);
            } else {
                console.error(`❌ [${getResp.status}] ${item.key}: ${item.url}`);
                errors++;
            }
        } else {
            console.error(`❌ [${status}] ${item.key}: ${item.url}`);
            errors++;
        }
      }
    } catch (error) {
      console.error(`❌ [ERR] ${item.key}: ${item.url} - ${(error as Error).message}`);
      errors++;
    }
  }

  console.log("\n-------------------");
  if (errors === 0) {
    console.log("🎉 All links are valid!");
    process.exit(0);
  } else {
    console.error(`💥 Found ${errors} broken links.`);
    process.exit(1);
  }
}

checkLinks();
