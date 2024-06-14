import {useMemo} from "react";
export const useSortedProjects = (projects, sort) => {
    // каждый раз при изменении сортировки или пула проектов вызывается и сортирует
    const sortedProjects = useMemo(() => {
        if (sort)
            return [...projects].sort((a, b) => a[sort].localeCompare(b[sort]))
        return projects;

    }, [sort, projects])

    return sortedProjects;
}

export const useProjects = (projects, sort, query) => {
    const sortedProjects = useSortedProjects(projects,sort);

    // каждый раз при изменении поиска или пула проектов вызывается и выполняет поиск на сортированном массиве
    const sortedAndSearchedProjects = useMemo(() => {
        return sortedProjects.filter(project => project.name.toLowerCase().includes(query))
    }, [query, sortedProjects])

    return sortedAndSearchedProjects;
}