export default function MenuItem() {
    return (
        <div
            className="bg-gray-200 p-4 rounded-lg 
        text-center hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all">
            <div className="text-center ">
                <img src={"/pizza.png"}
                    className="max-h-auto max-h-24 block mx-auto"
                    alt={"pizza"} />
            </div>
            <h4 className="font-semibold my-2 text-xl">Pepperoni Pizza</h4>
            <p className="text-gray-500 text-sm">
                Satisfy your pizza cravings with our Classic Pepperoni Pizza! Picture a perfect blend of hand-tossed crust, zesty tomato sauce, gooey mozzarella, and premium pepperoni slices. Every bite
                is a flavor-packed delight. Order now for a taste of pizza perfection!
            </p>
            <button
                className="bg-primary text-white rounded-ful px-6 py-2 rounded-full">
                Add to cart Ksh 400</button>
        </div>
    )
}