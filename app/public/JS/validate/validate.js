const checkNull = (value) => {
    if (value) {
        return true;
    } else {
        return false
    }
};

const checkNumber = (value) =>{
    let regexNumber = /^\d+$/;
    let checkNumber = regexNumber.test(value);
    if (checkNumber) {
        return true
    }else{
        return false
    }
}

export { checkNull, checkNumber };