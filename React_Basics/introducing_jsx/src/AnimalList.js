function AnimalList() {
    const animals = [
        { id: 1, name: "Dog"},
        { id: 2, name: "Cat"},
        { id: 3, name: "Cow"},
    ];
    return (
        <ul>
            {animals.map(animal => (
                <li key={animal.id}>{animal.name}</li>
            ))}
        </ul>
    )
}

export default AnimalList;