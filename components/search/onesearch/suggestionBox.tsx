export default function(props: { children: React.ReactNode }) {
    return (
        <div className="relative w-11/12 sm:w-[700px] h-auto left-1/2 translate-x-[-50%] top-72 z-10">
            {props.children}
        </div>
    );
}
