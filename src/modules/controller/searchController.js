import { router } from '../rooter'


export const searchController = formSearch => {
    formSearch.addEventListener ('submit', (e) => {
        e.preventDefault();

        router.navigate(`search?value=${formSearch.search.value}`)
        
    })
}