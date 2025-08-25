// pages/api/sales-representative/index.ts
import { createRouter } from "next-connect";
import { connectToDatabase } from "../../../../../backend/config/db-connection";
import onError from "../../../../../backend/utils/error";
import { getCommission } from "../../../../../backend/controller/user-controller";

const router = createRouter();

await connectToDatabase();

router.post(createSaleRepresentative);

export default router.handler({ onError: onError as any });