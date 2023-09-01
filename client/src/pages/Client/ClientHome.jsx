import { useState } from "react";
import styles from "../../assets/Styles";
import { Input, Card, PrimaryButton, SecondaryButton } from "../../components/UI";
import { FiSearch } from "react-icons/fi";

const ClientHome = () => {
  // // The initial freelancers array goes here. This is just a sample array. You can replace it with your own array of objects.
  const initialFreelancers = [
    {
      name: "Name 1",
      gender: "Male",
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
      gender: "Male",
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
    {
      name: "Name 3",
      gender: "Male",
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
      gender: "Female",
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
      gender: "Female",
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

  // The select options object goes here.
  const selectOptions = {
    budget: {
      options: ["$0 - $25", "$25 - $50", "$50 - $100", "$100 - $200", "$200 - $500"],
      placeholder: "Budget",
    },
    rating: {
      options: ["1+", "2+", "3+", "4+", "5+"],
      placeholder: "Rating",
    },
    gender: {
      options: ["Male", "Female", "Other"],
      placeholder: "Gender",
    },
  };

  // State definitions 
  const [searchClicked, setSearchClicked] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filters, setFilters] = useState({
    budget: "",
    rating: "",
    gender: "",
  });
  const [filteredFreelancers, setFilteredFreelancers] = useState(initialFreelancers);

  // Handle search input change.
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  // Handle filter input change.
  const handleInputChange = (key) => (e) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [key]: e.value, // e.value is the value of the selected option
    }));
  };

  // Filter freelancers based on search and filter criteria.
  const handleSearchAndFilter = () => {
    let currentList = [...initialFreelancers];

    // Check if any filter or search is applied.
    let isFilterApplied = searchValue || filters.budget || filters.rating || filters.gender;

    // Name search filter.
    if (searchValue) {
      currentList = currentList.filter(freelancer =>
        freelancer.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    // Budget filter.
    if (filters.budget) {
      const [min, max] = filters.budget.split('-').map(val =>
        Number(val.trim().replace('$', ''))
      );
      currentList = currentList.filter(freelancer =>
        freelancer.price >= min && freelancer.price <= max
      );
    }

    // Rating filter.
    if (filters.rating) {
      const minRating = Number(filters.rating.replace('+', ''));
      currentList = currentList.filter(freelancer =>
        freelancer.rating >= minRating
      );
    }

    // Gender filter.
    if (filters.gender) {
      currentList = currentList.filter(freelancer =>
        freelancer.gender === filters.gender
      );
    }

    setFilteredFreelancers(currentList);

    if (isFilterApplied) {
      setSearchClicked(true);
    }
  };

  // Reset filters and search input.
  const resetFilters = () => {
    setSearchValue("");
    setFilters({
      budget: "",
      rating: "",
      gender: "",
    });
    setFilteredFreelancers(initialFreelancers);
    setSearchClicked(false);
  };

  // Handle form submission.
  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSearchAndFilter();
  };

  return (
    <div className={`md:mx-60 sm:gap-10 gap-5 flex flex-col items-center`}>
      <form onSubmit={handleFormSubmit} className="w-full flex flex-col items-center gap-5">
        {/* Search Input */}
        <div className="w-full relative">
          <Input
            labelText="Search"
            labelFor="search"
            id="search"
            name="search"
            type="text"
            placeholder="Search for..."
            value={searchValue}
            customClass="pl-12 py-4 w-full placeholder-gray"
            handleChange={handleSearchChange}
          />
          <div className="absolute z-10 left-3 top-1/2 transform -translate-y-1/2">
            <FiSearch size={24} className="text-gray" />
          </div>
        </div>

        {/* Search Filters */}
        <div className="w-full flex sm:flex-row flex-col gap-5 justify-between">
          {Object.keys(selectOptions).map((optionKey) => (
            <div className="flex-1" key={optionKey}>
              <Input
                labelText={optionKey.charAt(0).toUpperCase() + optionKey.slice(1)}
                labelFor={optionKey}
                id={optionKey}
                name={optionKey}
                type="select"
                placeholder={selectOptions[optionKey].placeholder}
                options={selectOptions[optionKey].options}
                customClass="text-center focus:bg-primary focus:text-white"
                value={filters[optionKey]}
                handleChange={handleInputChange(optionKey)}
              />
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="w-full flex sm:flex-row flex-col gap-5">
          <div className="flex flex-1 justify-end">
            <PrimaryButton name="Search" type="submit" customClass="sm:w-1/2" />
          </div>
          <div className="flex flex-1 justify-start">
            <SecondaryButton name="Reset Filters" customClass="sm:w-1/2 truncate" onClick={resetFilters} />
          </div>
        </div>
      </form>

      {/* Display Searched Data */}
      <div className={`${styles.borderBox} ${styles.padding} w-full sm:gap-10 gap-5 flex flex-col text-center`}>
        {searchClicked && (
          <div className="flex flex-col gap-3">
            <h3 className={`${styles.heading3}`}>Search Result</h3>
            <p className={`${styles.paragraph}`}>Showing {filteredFreelancers.length} freelancers that match your criteria</p>
          </div>
        )}
        {filteredFreelancers.length > 0 ? (
          filteredFreelancers.map((properties, index) => (
            <Card key={index} properties={properties} />
          ))
        ) : (
          <p className={`${styles.paragraph} text-red`}>No freelancers match your criteria.</p>
        )}
      </div>
    </div>
  )
}

export default ClientHome;