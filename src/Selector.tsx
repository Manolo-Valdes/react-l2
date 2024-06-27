import { useEffect, useState } from "react";

export interface SelectorProps{
    onChange: (category:number,difficulty:string)=> void
}

interface TriviaCategory
{"id":number,"name":string}

function Selector({onChange}:SelectorProps) {
    const [categories, setCategories] = useState<TriviaCategory[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');

    useEffect(() => {
        fetch("https://opentdb.com/api_category.php")
        .then(response => response.json())
        .then(data =>  setCategories(data.trivia_categories))
},[]);

const onCategoryChange = (event:React.ChangeEvent<HTMLSelectElement>) =>
    {
    const value = event.target.value;
    setSelectedCategory(value);
    }
const onDifficultyChange = (event:React.ChangeEvent<HTMLSelectElement>) =>
    {
        const value = event.target.value;
        setSelectedDifficulty(value);
    }
const onButtonClick = () =>
    {
        console.log(selectedCategory, selectedDifficulty);
        onChange(Number(selectedCategory) ,selectedDifficulty);
    }

return (
    <>
    <div className="d-inline-flex">
    <select id="categorySelect" className="form-select" onChange={onCategoryChange}>
    <option value="" hidden>Select a category</option>
        {
            categories.map(c => 
                (<option key={c.id} value={c.id}>{c.name}</option>))
        }
    </select>
    <select id="difficultySelect" className="form-select" onChange={onDifficultyChange}>
    <option value="" hidden>Select difficulty</option>
    <option value="easy">Easy</option>
    <option value="medium">Medium</option>
    <option value="hard">Hard</option>
    </select>
    <button id="createBtn" className="btn btn-outline-secondary rounded-end" onClick={onButtonClick}>Create</button>
    </div>
    </>
);
}

export default Selector;
