import useDarkMode from "lib/darkModeHook";
import getVersion, { apiVersion, clientNLUVersion } from "lib/version";
import AboutLayout from "./layout";

export default function AboutPage() {
    const darkMode = useDarkMode();

    return (
        <AboutLayout>
            <h1 className="text-4xl font-bold mb-6">About SparkHome</h1>
            <div className="flex mb-8">
                <img src="/favicon.ico" className="relative w-20 h-20" />
                <div className="flex flex-col ml-4">
                    <span className="leading-7 md:leading-9 text-3xl font-bold">SparkHome</span>
                    <p className="mt-2 leading-5 text-base md:text-xl">
                        Made with <span className="text-red-500">♥️</span> by
                        <a className="underline text-red-500 mx-1" href="https://alikia2x.com">
                            alikia2x
                        </a>
                        from Luminara Studio
                    </p>
                </div>
            </div>

            <Version title="Overall Version" version={getVersion()} versionClass="bg-red-500" />
            <Version
                title="Browser NLU Model Version"
                version={"Build " + clientNLUVersion}
                versionClass="bg-purple-500"
            />
            <Version
                title="Backend API Version"
                version={"/api/v" + apiVersion}
                versionClass="bg-orange-500"
            />
            <p className="flex items-center my-3">
                <span className="font-bold text-xl md:text-2xl mr-4 w-[36rem]">License</span>
                <span
                    className="relative px-2 py-1 text-sm font-bold rounded-md text-nowrap underline
                     bg-green-600 text-white"
                >
                    <a href="/about/license">→ view</a>
                </span>
            </p>

            <p className="relative font-bold text-2xl mt-12">Presented By</p>
            {!darkMode && <img src="/LuminaraStudio.png" className="relative md:h-64 mt-6" />}
            {darkMode && <img src="/LuminaraStudioDark.png" className="relative md:h-56 mt-6" />}
        </AboutLayout>
    );
}

function Version(props: { title: string; version: string; versionClass?: string }) {
    document.title = "About SparkHome";
    return (
        <p className="flex items-center my-3">
            <span className="font-bold text-xl md:text-2xl mr-4 w-[36rem]">{props.title}</span>
            <span
                className={
                    "relative px-2 py-1 text-sm font-bold rounded-md text-nowrap text-white " +
                        props.versionClass ?? ""
                }
            >
                {props.version}
            </span>
        </p>
    );
}
