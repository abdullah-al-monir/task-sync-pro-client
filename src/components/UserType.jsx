
const UserType = () => {
  const userTypes = [
    { type: 'Developers', description: 'For coders and programmers seeking project management tools.' },
    { type: 'Corporate Professionals', description: 'Tailored for office workers and managers handling tasks and projects.' },
    { type: 'Bankers', description: 'Suited for finance professionals managing banking tasks and projects.' },
  ];

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-semibold text-center mb-8">Who Benefits From Our Service?</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {userTypes.map((user, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">{user.type}</h3>
              <p className="text-gray-600">{user.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserType;
