export default function Categories({ categories }) {
  return (
    <div className="flex flex-wrap justify-between  gap-4 mb-10">
      {categories.map((category) => (
        <div
          key={category.id}
          className="flex flex-col items-center border border-black py-8 px-6 rounded-md shadow-md"
        >
          <img alt={category.name} src={category.ico} className="w-8 h-8 mb-2" />
          <h1 className="text-center">{category.name}</h1>
        </div>
      ))}
    </div>
  );
}
