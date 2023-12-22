const ContactUs = () => {
  return (
    <div className="container mx-auto mt-10">
      <div
        className="flex flex-col md:flex-row
       gap-5 items-center"
      >
        <div>
          <img
            src="https://img.freepik.com/free-vector/isometric-time-management-concept-illustrated_52683-55534.jpg"
            alt=""
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-5 text0center">Contact Us</h1>
          <p className="text-lg">
            If you have any questions, suggestions, or feedback, please feel
            free to reach out to us. We are here to assist you!
          </p>
          <div className="mt-6">
            <p className="text-lg">Email: contact@tasksyncpro.com</p>
            <p className="text-lg">Phone: +123 456 7890</p>
            <p className="text-lg">
              Address: 123 Task Street, City, Bangladesh
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
