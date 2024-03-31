import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./global.css";
import { NextIntlClientProvider, useMessages } from "next-intl";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "SparkHome",
    description: "Your best browser homepage, with a magic searchbox.",
    icons: {
        icon: "/favicon.ico"
    }
};

export default function LocaleLayout({
    children,
    params: { locale }
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    const messages = useMessages();
    return (
        <html lang={locale}>
            <body className={inter.className}>
                <NextIntlClientProvider locale={locale} messages={messages}>
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
