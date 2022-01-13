type RecordingType = 'studio' | 'live';

type Album = {
    artist: string;
    title: string;
    releaseDate: Date;
    recordingType: RecordingType;
}

const continuum: Album = {
    artist: 'john mayer',
    title: 'continuum',
    releaseDate: new Date('01/01/2007'),
    recordingType: 'studio'
}

const liveInLA: Album = {
    artist: 'john mayer',
    title: 'live in la',
    releaseDate: new Date('01/12/2007'),
    recordingType: 'live'
}

function pluck<T, K extends keyof T>(record: T[], key: K): T[K][] {
    return record.map(a => a[key]);
}

const titles = pluck([continuum, liveInLA], 'title');

export {};