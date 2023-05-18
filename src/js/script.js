{
    use strict';

    const select = {
        templateOf: {
        book: '#template-book',
        },
        containerOf: {
        list: '.books-list',
        filters: '.filters',
        },
        book: {
        image: '.book__image',
        }
    };

    const templates = {
        book: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
    };

    const classNames = {
        favorite: 'favorite',
        hidden: 'hidden',
    };

    class BookList{
        constructor(){
        const thisBookList = this;
        
        thisBookList.favoriteBooks = [];
        thisBookList.filters = [];

        thisBookList.initData();
        thisBookList.getElements();
        thisBookList.initActions();

        }

        getElements(){
        const thisBookList = this;

        thisBookList.form = document.querySelector(select.containerOf.filters);
        thisBookList.books = document.querySelectorAll(select.book.image);

        }

        initData(){
        const thisBookList = this;

        this.data = dataSource.books; 

        for(let book of this.data){
            const generatedHTML = templates.book(book);

            const DOMElement = utils.createDOMFromHTML(generatedHTML);

            const bookListElement = document.querySelector(select.containerOf.list);

            bookListElement.appendChild(DOMElement);
            
            const ratingBgc = thisBookList.determineRatingBgc(book.rating);
            const ratingWidth = book.rating * 10;
            book.ratingBgc = ratingBgc;
            book.ratingWidth = ratingWidth;
        }
        }

        initActions(){
        const thisBookList = this;

        for(let book of thisBookList.books){
            book.addEventListener('dblclick', function(event){
            event.preventDefault();
                
            const clickedBook = event.target;
            const clickedBookParent = clickedBook.offsetParent;

            const bookId = clickedBookParent.getAttribute('data-id');

            if(!thisBookList.favoriteBooks.includes(bookId)){
                clickedBookParent.classList.add(classNames.favorite);
                thisBookList.favoriteBooks.push(bookId); 

            } else {
                clickedBookParent.classList.remove(classNames.favorite);
                thisBookList.favoriteBooks.splice(thisBookList.favoriteBooks.indexOf(bookId), 1);
            }

            console.log(thisBookList.favoriteBooks);
            });
        }

        thisBookList.form.addEventListener('click', function(event){
            const filter = event.target;

            if (
            filter.tagName == 'INPUT' &&
            filter.type == 'checkbox' &&
            filter.name == 'filter'
            ) {
            let filterValue = filter.value;
            console.log('filterValue:', filterValue);

            if ( 
                filter.checked == true
            ) {
                thisBookList.filters.push(filterValue);
            } else {
                thisBookList.filters.splice(thisBookList.filters.indexOf(filterValue), 1);
            }

            console.log('filters:', thisBookList.filters);
            }

            thisBookList.filterBooks();
        });
        }

        filterBooks(){
        const thisBookList = this;

        for(let book of dataSource.books){

            let shouldBeHidden = false;

            for(const filter of thisBookList.filters){
            if (!book.details[filter]){
                shouldBeHidden = true;
                break;
            }
            }

            const filteredBookImage = document.querySelector('.book__image[data-id="' + book.id + '"]');

            if (shouldBeHidden == true){
            filteredBookImage.classList.add(classNames.hidden);
            } else {
            filteredBookImage.classList.remove(classNames.hidden);
            }
        }
        }

        determineRatingBgc(rating){
        const thisBookList = this;

        thisBookList.ratingBgc = '';

        if(rating < 6){
            thisBookList.ratingBgc = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';

        } else if(rating > 6 && rating <= 8){
            thisBookList.ratingBgc = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';

        } else if(rating > 8 && rating <= 9){
            thisBookList.ratingBgc = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);';

        } else if(rating > 9){
            thisBookList.ratingBgc = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);';

        }

        return thisBookList.ratingBgc;

        }
    }

    const app = new BookList();

    console.log('app:', app);

    }