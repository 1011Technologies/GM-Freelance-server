import { useState } from "react";
import styles from "../../assets/Styles";
import { Input, Card } from "../../components/UI";
import { FiSearch } from "react-icons/fi";

const RecentlyViewed = () => {
    const [searchValue, setSearchValue] = useState("");

    const recentlyViewedArray = [
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
        {
            name: "Name 4",
            price: 22,
            rating: 3,
            reviews: 30,
            distance: 2,
            responseTime: 75,
            responseRate: 80,
            availability: 5,
            profile_picture: "https://t4.ftcdn.net/jpg/03/83/25/83/360_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg",
            verified: true,
            freelancer_id: "freelancer4",
        },
        {
            name: "Name 5",
            price: 35,
            rating: 4.2,
            reviews: 25,
            distance: 8,
            responseTime: 150,
            responseRate: 70,
            availability: 4,
            profile_picture: "https://engineering.unl.edu/images/staff/Kayla-Person.jpg",
            verified: false,
            freelancer_id: "freelancer5",
        },
    ];

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    };

    const filteredProperties = recentlyViewedArray.filter((property) =>
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
                    <h3 className={`${styles.heading3}`}>Recently Viewed</h3>
                    <p className={`${styles.paragraph}`}>You have viewed {recentlyViewedArray.length} {recentlyViewedArray.length >= 1 ? "freelancers" : "freelancer"} recently</p>
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

export default RecentlyViewed;