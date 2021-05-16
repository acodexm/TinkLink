import { RequestHandler } from "express";

// import { TransactionData } from "../models";

export const getTransaction: RequestHandler = async (req, res) => {
  res.json({ text: "todo" });
};

export const getTransactions: RequestHandler = async (req, res) => {
  res.json({ text: "todo" });
};

// export const getPaginatedData = (
//   transactions: TransactionData[],
//   pageIndex: string,
//   filters?: string[],
//   sortBy?: string,
//   desc?: string,
// ) => {
//   let page = jobs[0].json.children;

//   let len = page.length;

//   if (filters) {
//     page = page.filter(job => job.text?.match(new RegExp(filters.join("|"), "gmi") ?? true));
//     len = page.length;
//   }
//   if (sortBy) {
//     if (sortBy == "date")
//       page = page.sort(sortByType({ id: "created_at_i", desc: desc === "true" }));
//     if (sortBy == "salary") {
//       page = page
//         .filter(job =>
//           job.text?.match(new RegExp(/[$£€]\d+.{0,2}-.{0,2}[$£€]?\d+k?/, "gmi") ?? true),
//         )
//         .map(job => {
//           let salary: any[] =
//             job.text.match(new RegExp(/[$£€]\d+.{0,2}-.{0,2}[$£€]?\d+k?/, "gmi")) || [];

//           if (salary && salary.length) salary = salary[0].match(/\d+/) || [];
//           return { ...job, salary };
//         })
//         .sort((l, r) => (desc === "true" ? l.salary[0] - r.salary[0] : r.salary[0] - l.salary[0]));
//     }
//     len = page.length;
//   }

//   const startRow = pageSize * Number(pageIndex);
//   const endRow = startRow + pageSize;

//   page = page.slice(startRow, endRow);
//   const hasMore = endRow < len;

//   return { page, hasMore } as const;
// };
