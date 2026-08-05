interface Props {

  title: string;

  value: string | number;

  color?: string;

  icon?: string;

}

export default function StatCard({

  title,

  value,

  color = "bg-white",

  icon = "📊",

}: Props) {

  return (

    <div
      className={`
        ${color}
        rounded-xl
        shadow-md
        p-6
        transition
        duration-200
        hover:shadow-xl
        hover:-translate-y-1
      `}
    >

      <div className="flex items-center justify-between">

        <p className="text-sm font-medium text-gray-600">

          {title}

        </p>

        <span className="text-3xl">

          {icon}

        </span>

      </div>

      <h2 className="mt-5 text-3xl font-bold text-gray-900">

        {value}

      </h2>

    </div>

  );

}
