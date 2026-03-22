import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "财精灵电商数字员工｜把经营结果，主动送到您眼前",
  description:
    "财精灵为电商企业提供基于飞书、企业微信、钉钉、邮件的数字员工方案。通过消息型交付，让经营晨报、库存预警、自动对账、老板助理等能力持续进入您的业务。",
  openGraph: {
    title: "财精灵电商数字员工｜把经营结果，主动送到您眼前",
    description:
      "财精灵为电商企业提供基于飞书、企业微信、钉钉、邮件的数字员工方案。通过消息型交付，让经营晨报、库存预警、自动对账、老板助理等能力持续进入您的业务。",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
