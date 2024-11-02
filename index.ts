import { requestRedstonePayload } from "@redstone-finance/sdk";

const makePayload = async (feedId: string) => {
  const DATA_SERVICE_ID = "redstone-avalanche-prod";
  const UNIQUE_SIGNER_COUNT = 3;

  const res = await requestRedstonePayload(
    {
      dataPackagesIds: [feedId],
      dataServiceId: DATA_SERVICE_ID,
      uniqueSignersCount: UNIQUE_SIGNER_COUNT,
    },
    "bytes",
  );
  const parsed = JSON.parse(res) as number[];

  if (!Array.isArray(parsed) || parsed.length === 0) {
    throw new Error("Invalid response");
  }

  const payload = Buffer.from(parsed);

  return payload;
};

(async () => {
  if (!process.argv[2]) {
    console.error("Usage: redstone-payload-util <feedId>");
    process.exit(1);
  }
  const feedId = process.argv[2];
  const payload = await makePayload(feedId);
  const bytes = JSON.stringify(Array.from(payload));
  console.log(bytes);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
