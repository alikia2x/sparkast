import useDarkMode from "lib/darkModeHook";
import getVersion, { apiVersion, clientNLUVersion } from "lib/version";

export default function AboutPage() {
    const darkMode = useDarkMode();

    return (
        <div className="dark:bg-[rgb(23,25,29)] dark:text-white min-h-screen w-screen overflow-x-hidden">
            <main
                className="relative h-full w-full md:w-3/4 lg:w-1/2 left-0 md:left-[12.5%] lg:left-1/4
                    pt-12"
            >
                <h1 className="text-4xl font-bold mb-6">About SparkHome</h1>
                <div className="flex mb-8">
                    <img src="/favicon.ico" className="relative w-20 h-20" />
                    <div className="flex flex-col ml-4">
                        <span className="text-3xl font-bold">SparkHome</span>
                        <p className="mt-2 text-xl">
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
                    <span className="font-bold text-2xl mr-4 w-[36rem]">License</span>
                    <span className="relative px-2 py-1 text-sm font-bold rounded-md text-nowrap underline
                     bg-green-600 text-white">
                        <a href="/about/license">→ view</a>
                    </span>
                </p>

                <p className="relative font-bold text-2xl mt-12">Presented By</p>
                {!darkMode && <img src="/LuminaraStudio.png" className="relative h-56 mt-6" />}
                {darkMode && <img src="/LuminaraStudioDark.png" className="relative h-56 mt-6" />}
            </main>
        </div>
    );
}

function Version(props: { title: string; version: string; versionClass?: string }) {
    document.title = "About SparkHome";
    return (
        <p className="flex items-center my-3">
            <span className="font-bold text-2xl mr-4 w-[36rem]">{props.title}</span>
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
