import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class SortService {
  constructor() {

  }

  sortAnswers = [
    {
      sortName: 'votes',
      sortType: 'desc',
      sortText: 'Highest score (default)'
    },
    {
      sortName: 'activity',
      sortType: 'desc',
      sortText: 'Date modified (newest first)'
    },
    {
      sortName: 'creation',
      sortType: 'asc',
      sortText: 'Date created (oldest first)'
    }
  ]
  sortQuestions = [
    {
      sortName: 'activity',
      sortType: 'desc',
      sortText: 'Active (default)'
    },
    {
      sortName: 'votes',
      sortType: 'desc',
      sortText: 'Score'
    },
    {
      sortName: 'creation',
      sortType: 'desc',
      sortText: 'Newest'
    },
    {
      sortName: 'relevance',
      sortType: 'desc',
      sortText: 'Relevance'
    }
  ]
}

