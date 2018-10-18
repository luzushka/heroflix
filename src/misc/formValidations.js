const validateTitle = (title, movies = [], isAddModal) => {
    if (!title.length){
        return "You must add a title";
    }
    if (isAddModal){
    const exists= movies.find(movie => (movie.title.toLowerCase() === title.toLowerCase()));
    if (exists){
        return "This movie already exists";
    }
}

    return '';
};

const validateReleaseYear = year =>{
    if (!!!year.match(/^\d{4}$/g)){
        return "Invalid release year";
    }

    return '';
};

const validateRuntime = runtime =>{
    if (!!!runtime.match(/^\d+$/g)){
        return "Invalid runtime";
    }

    return '';
};

const validateGenre = genre =>{
    if (!!!genre.length){
        return "Missing genre";
    }

    return '';
};

const validateDirector = director =>{
    if (!director.length){
        return "Missing director";
    }

    return '';
};

/**Takes a bad title (e.g. "@@@TaiTELLL@") and turns it into a beautiful title ("Taitelll") */
export const fixTitle = title =>{
    let newTitle = title.replace(/[^A-Za-z\s,:!?\d]/g, '').toLowerCase();
    return newTitle
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
    .join(' ');

}

/**Validates the form in terms of length */
export const errorCountValidator = (errorObj, isAddModal) =>{
    const keys = Object.keys(errorObj);
    if (isAddModal){
        if (keys.length<5){
            return false;
    }}

    let hasErrors = keys.some(key=>{
        return (errorObj[key].length>0);
    });

    return !hasErrors;
} 

export const errorsToArray = errorObj =>{
    let errorArr = [];
    let keys = Object.keys(errorObj);

    keys.forEach(key=>errorArr.push(errorObj[key]));

    return errorArr;
}

export default (field, value, args, isAddModal) =>{
    const validates = {
        title: ()=> validateTitle(fixTitle(value), args, isAddModal),
        release_year: ()=> validateReleaseYear(value),
        runtime: ()=> validateRuntime(value),
        genre: ()=> validateGenre(value),
        director: ()=>validateDirector(value),
    }

    return validates[field]();
}


