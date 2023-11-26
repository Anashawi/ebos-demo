import Link from "next/link";

interface Props {
    name?: string;
}
const ZeroProductCompetitorsWarning = ({ name }: Props) => {
    return (
        <section className="flex flex-col gap-8 p-4 bg-gray-50 rounded-2xl">
            <h4 className="text-[1.75rem] text-dark-400 font-hero-semibold">
                {name}
            </h4>
            <p className="text-2xl p-6 text-center text-gray-500">
                <strong> Oops!</strong> You haven&apos; defined any competitors
                for this product yet...
            </p>
            <Link
                href="./market-potential"
                className="text-2xl text-center hover:text-black-eerie text-blue-ncs"
            >
                Go define competitors?
            </Link>
        </section>
    );
};

export default ZeroProductCompetitorsWarning;
