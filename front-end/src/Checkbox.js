const Checkbox = ({ name, isCheck }) => {
    return (
        <li className="item">
            {isCheck ? name + ' ✅' : name}
        </li>
    );
}

export default Checkbox;