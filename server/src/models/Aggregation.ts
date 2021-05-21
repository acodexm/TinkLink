import mongoose, { Document } from "mongoose";

export type AggregationData = {
  merchant: string;
  merchantImg: string;
};

const AggregationSchema = new mongoose.Schema({
  aggregation: Object,
});

interface AggregationModel extends Document {
  aggregation: AggregationData;
}

export const Aggregations = mongoose.model<AggregationModel>("aggregation", AggregationSchema);
