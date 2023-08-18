import { markdownify } from "@lib/utils/textConverter";
import Image from "next/image"

function TeamCard({ person }) {
  const { name, image, title, bio } = person;
  return (
    <div className="flex flex-col flex-[1_0_0%] bg-white dark:bg-gray-800">
      <Image className="w-full h-auto" src={image} alt={name} />
      <div className="flex-1 p-4 md:p-5">
        <h4 className="text-gray-800 text-md dark:text-white">
          {markdownify(title)}
        </h4>
        <h3 className="text-lg font-bold text-gray-800">
          {markdownify(name)}
        </h3>
        <p className="mt-1 text-gray-800 dark:text-gray-400">
          {markdownify(bio)}
        </p>
      </div>
    </div>
  )
}

export default TeamCard
