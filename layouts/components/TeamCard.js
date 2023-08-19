import Image from "next/image"

function TeamCard({ person }) {
  const { name, image, title, bio } = person;
  return (
    <div className="flex flex-col flex-[1_0_0%] bg-[#edf6f5]">
      <div className="mb-2 sm:mb-3">
        <Image
          class="object-cover h-full rounded-t-xl sm:rounded-tr-none"
          src={image}
          alt={name}
          width={500}
          height={500}
        />
      </div>
      <div className="flex-1 p-3 md:p-4">
        <h3 className="text-2xl font-bold text-gray-800 sm:text-3xl">
          {name}
        </h3>
        <p className="text-lg text-gray-800 sm:text-xl">
          {title}
        </p>
        <div class="border-t ">
          <p class="text-sm text-gray-500">
            {bio}
          </p>
        </div>
      </div>
    </div>
  )
}

export default TeamCard;
