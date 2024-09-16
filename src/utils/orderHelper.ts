import { Coupon } from "@framework/types";

export const getDiscount = (total: number, coupon: Coupon) => {
  let dp = 0;
  if (coupon !== undefined) {
    if (coupon.isPercent) {
      dp = (coupon.amount * total) / 100;
      total = total - dp;
    } else {
      dp = coupon.amount;
      total = total - coupon.amount;
    }

    if (coupon.maxDiscount && dp > coupon.maxDiscount) {
      dp = coupon.maxDiscount;
      total = total - dp;
    }
  } else {
    total = total;
  }

  return { total, dp: Math.ceil(dp) };
};
