function MembershipPackageCard() {
  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">
        <h2 className="text-teal-900 text-2xl font-bold mb-6 text-center">
          Add Packages
        </h2>
        <form className="space-y-4">
          <div>
            <label className="block text-teal-900 font-medium">
              Package Name
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-900"
            />
          </div>
          <div>
            <label className="block text-teal-900 font-medium">
              Monthly Cost
            </label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-900"
            />
          </div>
          <div>
            <label className="block text-teal-900 font-medium">
              Points Per Dollar
            </label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-900"
            />
          </div>
          <div>
            <label className="block text-teal-900 font-medium">Benefits</label>
            <textarea
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-900"
              rows="3"
            ></textarea>
          </div>
          <div>
            <label className="block text-teal-900 font-medium">
              Description
            </label>
            <textarea
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-900"
              rows="3"
            ></textarea>
          </div>
          <div>
            <label className="block text-teal-900 font-medium">Category</label>
            <select className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-900 ">
              <option className="hover:bg-teal-900" value="">
                Select Category
              </option>
              <option className="hover:bg-teal-900" value="food">
                Food
              </option>
              <option className="hover:bg-teal-900" value="fashion">
                Fashion
              </option>
              <option className="hover:bg-teal-900" value="lifestyle">
                LifeStyle
              </option>
              <option className="hover:bg-teal-900" value="entertainment">
                Entertainment
              </option>
              <option className="hover:bg-teal-900" value="all">
                All
              </option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-teal-900 text-white p-3 rounded-lg hover:bg-gray-400 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default MembershipPackageCard;
