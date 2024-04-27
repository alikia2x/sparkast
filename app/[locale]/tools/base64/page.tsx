import { useTranslations } from "next-intl";

export default function Base64() {
    const t = useTranslations("tools");
    return (
        <div>
            <h1 className="text-3xl font-semibold">{t("base64.title")}</h1>
        </div>
    );
}
