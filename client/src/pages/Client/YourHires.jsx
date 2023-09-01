import { useState } from "react";
import styles from "../../assets/Styles";
import { Input, Card } from "../../components/UI";
import { FiSearch } from "react-icons/fi";

const YourHires = () => {
    const [searchValue, setSearchValue] = useState("");

    const yourHiresArray = [
        {
            name: "Name 1",
            price: 25,
            rating: 4.5,
            reviews: 20,
            distance: 3,
            responseTime: 90,
            responseRate: 90,
            availability: 5,
            profile_picture: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            verified: true,
            freelancer_id: "freelancer1",
        },
        {
            name: "Name 2",
            price: 30,
            rating: 3.8,
            reviews: 15,
            distance: 7,
            responseTime: 120,
            responseRate: 85,
            availability: 4,
            profile_picture: "https://square-vn.com/app/dscms/assets/images/person-1.jpg?v=1653932875",
            verified: false,
            freelancer_id: "freelancer2",
        },
        // Add more properties for freelancers 3, 4, and 5
        {
            name: "Name 3",
            price: 28,
            rating: 4.0,
            reviews: 10,
            distance: 5,
            responseTime: 60,
            responseRate: 95,
            availability: 3,
            profile_picture: "https://t3.ftcdn.net/jpg/02/99/04/20/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg",
            verified: true,
            freelancer_id: "freelancer3",
        },
    ];

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    };

    const filteredProperties = yourHiresArray.filter((property) =>
        property.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <div className={`md:mx-60 sm:gap-10 gap-5 flex flex-col`}>
            <div className="w-full relative">
                <Input
                    labelText="Search"
                    labelFor="search"
                    id="search"
                    name="search"
                    type="text"
                    placeholder="Search for a freelancer"
                    value={searchValue}
                    customClass="pl-12 py-4 w-full placeholder-gray"
                    handleChange={handleSearchChange}
                />
                <div className="absolute z-10 left-3 top-1/2 transform -translate-y-1/2">
                    <FiSearch size={24} className="text-gray" />
                </div>
            </div>
            <div className={`${styles.borderBox} ${styles.padding} w-full sm:gap-10 gap-5 flex flex-col text-center`}>
                <div className="flex flex-col gap-3">
                    <h3 className={`${styles.heading3}`}>Your Hires</h3>
                    <p className={`${styles.paragraph}`}>You have hired {yourHiresArray.length} {yourHiresArray.length >= 1 ? "freelancers" : "freelancer"}</p>
                </div>
                {filteredProperties.length > 0 ? (
                    filteredProperties.map((properties, index) => (
                        <Card key={index} properties={properties} />
                    ))
                ) : (
                    <p className={`${styles.paragraph} text-red`}>No freelancers match your search criteria.</p>
                )}
            </div>
        </div>
    );
};

export default YourHires;