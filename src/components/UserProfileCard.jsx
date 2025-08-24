export default function UserProfileCard({ user }) {
  const { imageUrl, firstname, lastname, gender, skill, about } = user;
  
  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-lg shadow-lg border border-gray-200">
      <div className="p-6">
        {/* Profile Image */}
        <div className="flex justify-center mb-4">
          <div className="relative">
            <img
              src={
                imageUrl ||
                "/placeholder.svg?height=112&width=112&query=profile"
              }
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-gray-200"
            />
          </div>
        </div>

        {/* User Information */}
        <div className="text-center space-y-3 mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
            {firstname + " " + lastname}
          </h2>

          <div className="space-y-2">
            <div className="flex justify-center">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm bg-blue-100 text-blue-800">
                {gender}
              </span>
            </div>

            <p className="text-sm sm:text-base font-medium text-blue-600">
              {skill.map((items) => items)}
            </p>
          </div>
        </div>

        {/* About Section */}
        <div className="mb-6">
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            {about}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button className="flex-1 flex items-center justify-center px-4 py-2 border border-red-500 text-red-500 bg-transparent rounded-md hover:bg-red-500 hover:text-white transition-colors duration-200 text-sm font-medium">
            Ignored
          </button>

          <button className="flex-1 flex items-center justify-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors duration-200 text-sm font-medium">
            Intrested
          </button>
        </div>
      </div>
    </div>
  );
}
