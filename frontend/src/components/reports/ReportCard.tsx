interface Props {
  title: string;
  value: string | number;
}

export default function ReportCard({
  title,
  value,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-6">

      <p className="text-gray-500 text-sm">
        {title}
      </p>

      <h2 className="mt-3 text-3xl font-bold">
        {value}
      </h2>

    </div>
  );
}
