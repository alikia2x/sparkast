import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./global.css";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { ThemeProvider } from "next-themes";
import { Providers } from "../providers";

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
        <html lang={locale} suppressHydrationWarning>
            <body className={inter.className}>
                <ThemeProvider>
                    <Providers>
                        <NextIntlClientProvider locale={locale} messages={messages}>
                            {children}
                        </NextIntlClientProvider>
                    </Providers>
                </ThemeProvider>
            </body>
        </html>
    );
}
