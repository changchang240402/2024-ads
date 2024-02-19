import logo from "../../assets/ggads.png";
import background from "../../assets/background-image.png";

function Login() {
  return (
    <div className="flex z-10">
      <div className=" flex flex-col justify-center items-center flex-1 h-screen bg-white font-poppins">
        <div className="container rounded-3xl m-10 shadow-xl bg-white w-1/2 ">
          <div className="m-10">
            <div className="flex justify-start my-5 items-start">
              <img className="w-6 h-6" src={logo} alt="logo" />
              <span className="text-[#387DE4] text-xl font-bold">
                ds System
              </span>
            </div>
            <form className="form flex flex-col">
              <p className="text-[#387DE4] text-4xl mb-12 font-semibold">
                Welcome back
              </p>
              <div className="flex flex-col">
                <label className="font-medium text-lg mb-2" htmlFor="email">Email</label>
                <input
                  className="px-4 py-3 shadow-sm rounded-3xl border-2 focus:outline-none focus:border-[#387DE4] bg-white"
                  type="email"
                  placeholder="Enter your email"
                  id="email"
                  name="email"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-lg mt-12 mb-2" htmlFor="password">Password</label>
                <input
                  className="px-4 py-3 shadow-sm rounded-3xl border-2 focus:outline-none focus:border-[#387DE4] bg-white"
                  type="password"
                  placeholder="Enter your password"
                  id="password"
                  name="password"
                />
              </div>
              <div className="flex justify-center mt-16 text-center">
                <button className="bg-[#387DE4] rounded-3xl px-6 py-3 font-bold text-white">
                  SIGN IN
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="h-screen flex items-center bg-[#A5E1F3]">
        <img className="w-[700px] z-20" src={background} alt="" />
      </div>
    </div>
  );
}

export default Login;
