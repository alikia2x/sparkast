export default function(props: { children: React.ReactNode }) {
    return (
        <div>
            <p>{props.children}</p>
        </div>
    );
}