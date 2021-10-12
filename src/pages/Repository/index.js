import React, { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../services/api';

import Container from '../../components/Container';

import { Loading, Owner, IssueList } from './styles';

export default function Repository() {
    const [repository, setRepository] = useState({});
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const { repository: paramRepository } = useParams();

    const getInformation = useCallback(async () => {
        const repoName = decodeURIComponent(paramRepository);

        const [apiRepository, apiIssues] = await Promise.all([
            api.get(`/repos/${repoName}`),
            api.get(`/repos/${repoName}/issues`, {
                params: {
                    state: 'open',
                    per_page: 5,
                },
            }),
        ]);
        setRepository(apiRepository.data);
        setIssues(apiIssues.data);
        setLoading(false);
    }, [paramRepository]);

    useEffect(() => {
        getInformation();
    }, [getInformation]);

    if (loading) {
        return <Loading>Carregando</Loading>;
    }

    return (
        <Container>
            <Owner>
                <Link to="/">Voltar aos repositórios</Link>
                <img
                    src={repository.owner.avatar_url}
                    alt={repository.owner.login}
                />
                <h1>{repository.name}</h1>
                <p>{repository.description}</p>
            </Owner>

            <IssueList>
                {issues.map((issue) => (
                    <li key={String(issue.id)}>
                        <img
                            src={issue.user.avatar_url}
                            alt={issue.user.login}
                        />
                        <div>
                            <strong>
                                <a href={issue.html_url}>{issue.title}</a>
                                {issue.labels.map((label) => (
                                    <span key={String(label.id)}>
                                        {label.name}
                                    </span>
                                ))}
                            </strong>
                            <p>{issue.user.login}</p>
                        </div>
                    </li>
                ))}
            </IssueList>
        </Container>
    );
}
