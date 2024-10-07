export default function Error({ error }) {
    return (
        <div>
            <h1>Authentication Error</h1>
            <p>{error}</p>
        </div>
    );
}

export async function getServerSideProps(context) {
    return {
        props: {
            error: context.query.error,
        },
    };
}
