import Hero from "../components/layout/Hero";
import HomeMenu from "../components/layout/HomeMenu";
import SectionHeaders from "../components/layout/SectionHeaders";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="text-center my-16">
        <SectionHeaders
          subHeader={'Our story'}
          mainHeader={'About us'}
        />
        <div className="max-w-md text-gray-500 mx-auto mt-4 flex flex-col gap-4">
          <p className="  ">
            Welcome to St. Pizza, where passion meets palate! Our handcrafted dough, secret sauce, premium mozzarella, and signature pepperoni blend into a symphony of flavor. Whether you're dining with friends or enjoying a solo pizza night, every slice at St. Pizza is a journey
            into exceptional craftsmanship. Order now and savor the difference!
          </p>
        </div>
      </section>
      <section className="text-center my-8">
        <SectionHeaders
        subHeader={'Don\'t hesitate'}
        mainHeader={'Contact us'}
        />
        <div className="mt-8">
        <a className="text-4xl underline text-gray-500" href="tel:+254707894405">+254 707894405</a>
        </div>
      </section>

    </>
  );
}
