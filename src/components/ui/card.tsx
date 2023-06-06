export const Card = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => {
  return (
    <div className="max-w-md rounded-2xl border border-gray-400 bg-white px-2 py-4">
      <h2 className="mb-4 text-2xl font-semibold text-black">Title: {title}</h2>
      <p className="text-base text-gray-700">{content}</p>
    </div>
  );
};

export default Card;
