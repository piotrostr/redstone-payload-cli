import { Command } from "commander";
import { requestRedstonePayload } from "@redstone-finance/sdk";

const program = new Command();

const makePayload = async (feedId: string, signerCount: number) => {
  const DATA_SERVICE_ID = "redstone-primary-prod";

  const res = await requestRedstonePayload(
    {
      dataPackagesIds: [feedId],
      dataServiceId: DATA_SERVICE_ID,
      uniqueSignersCount: signerCount,
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

program
  .name("redstone-payload-util")
  .description("Utility to generate Redstone payload")
  .argument("<feedId>", "feed ID to generate payload for")
  .option("-s, --signers <number>", "number of unique signers", "3")
  .action(async (feedId, options) => {
    try {
      const signerCount = parseInt(options.signers);
      const payload = await makePayload(feedId, signerCount);
      const bytes = JSON.stringify(Array.from(payload));
      console.log(bytes);
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  });

program.parse();
