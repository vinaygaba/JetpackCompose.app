export default class ComponentPreviewCardMetadata {
    id: number;
    contributionTitle: string;
    contributor: string;
    contributionLink: string
    contributionPreviewImageUrl: string;

    constructor(id: number, title: string, contributor: string, link: string, contributionPreviewImageUrl: string) {
        this.id = id;
        this.contributionTitle = title
        this.contributor = contributor
        this.contributionLink = link
        this.contributionPreviewImageUrl = contributionPreviewImageUrl
    }
}