import React, { useState } from 'react';
import algoliasearch from 'algoliasearch/lite';
import fallbackImage from './assets/no-logo.png';
import fallbackAvatarImage from './assets/missing-avatar.jpeg';
import crunchbaseLogo from './assets/crunchbase.png';
import linkedInLogo from './assets/linkedIn.png';
import twitterLogo from './assets/twitter.png';
import GitHubButton from 'react-github-btn';

import {
  Configure,
  Highlight,
  Hits,
  InstantSearch,
  Pagination,
  SearchBox,
  RefinementList,
  HitsPerPage,
  Stats
} from 'react-instantsearch';

import { Panel } from './Panel';

import type { Hit } from 'instantsearch.js';

import './App.css';

const searchClient = algoliasearch(
  'UD1VE6KV0J',
  '4942d21dd5c6d932f63d97966c40d9d0'
);

function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

const transformItems = (items) => {
  return items.map((item) => ({
    ...item,
    label: item.label.replace(/_/g, ' '),
  }));
};

const future = { preserveSharedStateOnUnmount: true };

export function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div>

      <InstantSearch
        searchClient={searchClient}
        indexName="Less-Code-Tools"
        future={future}
        routing={true}
      >

        <header className="header">
          <h1 className="header-title">
            Less-Code Tools & Patterns
            <Stats />
          </h1>
          <div className="gh-btn">

            <GitHubButton href="https://github.com/d1b1/less-code-tools" data-color-scheme="no-preference: light; light: light; dark: dark;" data-size="large" data-show-count="true" aria-label="Star d1b1/techstar-companies on GitHub">Star</GitHubButton>
          </div>
        </header>

        <div className="container-fluid">

          <Configure hitsPerPage={25} />

          <div className="row">
            <div className="col-3 d-none d-md-block d-lg-block">

              <div className="filter-el">
                <h4>
                  Known for:
                </h4>
                <RefinementList searchable="true" searchablePlaceholder="Enter a feature..." attribute="services" limit="5" />
              </div>

              <div className="filter-el">
                <h4>
                  Type of Solution:
                </h4>
                <RefinementList searchable="true" attribute="type" searchablePlaceholder="Enter type..." limit="5" />
              </div>

              <div className="filter-el">
                <h4>
                  Year Founded:
                </h4>
                <RefinementList attribute="founded" />
              </div>

              <div className="filter-el">
                <h4>
                  Total Funds Raised:
                </h4>
                <RefinementList attribute="totalFunding" />
              </div>

              <div className="filter-el">
                <h4>
                  Governance:
                </h4>
                <RefinementList searchable="true" searchablePlaceholder="Enter a vertical..." attribute="governance" />
              </div>

              <div className="filter-el">
                <h4>
                  Offers on Prem:
                </h4>
                <RefinementList attribute="hasOnPrem" />
              </div>

              <div className="filter-el">
                <h4>
                  has Versioning
                </h4>
                <RefinementList attribute="hasVersioning" />
              </div>

            </div>
            <div className="col-md-9 p-4">

              <SearchBox placeholder="Enter a name..." className="searchbox" />

              <Hits hitComponent={Hit} />

              <br />
              <Pagination padding={2} />

            </div>
          </div>
        </div>
      </InstantSearch>
    </div>
  );
}

type HitProps = {
  hit: Hit;
};

const base = 'https://raw.githubusercontent.com/d1b1/less-code-tools/master/data/logos';

function ImageWithFallback({ src, alt, classname, ...props }) {
  const handleError = (e) => {
    e.target.src = fallbackImage;
  };

  const imageUrl = base + '/' + src;

  return <img src={imageUrl} className={classname} alt={alt} onError={handleError} {...props} />;
}

function AvatarWithFallback({ src, alt, classname, ...props }) {
  const handleError = (e) => {
    e.target.src = fallbackAvatarImage;
  };

  return <img src={src || ''} width="80" className={classname} onError={handleError} {...props} />;
}

const YearsBetween = ({ year }) => {
  const currentYear = new Date().getFullYear();
  const yearsBetween = currentYear - year;

  return <span>{yearsBetween} years</span>;
};

function Hit({ hit }: HitProps) {

  const base = 'https://raw.githubusercontent.com/d1b1/less-code-tools/master/data/logos';

  return (
    <article>
      <div className="row">
        <div className="col-7">

          <a href={`${hit.url}`} target="_blank">
            <ImageWithFallback src={hit.logo} width="150" className="compLogo" alt={hit.name} />
          </a>

          <h3>
            {hit.name}
          </h3>

          <p>
            <Highlight attribute="headline" hit={hit} />
          </p>

          <p>

            <div className="m-2">
              {(hit.industry_vertical || []).map((item, index) => (
                <span key={index} className="badge bg-secondary me-1">
                  {item}
                </span>
              ))}

              <small >
                Age: {hit.founded} (<YearsBetween year={hit.founded} /> ago),
                &nbsp;
                {hit['url'] && <a href={`${hit.url}`} target="_blank">{hit.url}</a>}
              </small>

            </div>
          </p>

        </div>
        <div className="col-5">

          <table className="table table-sm table-striped">
            <tbody>
              <tr>
                <th width="60%" className="text-end">
                  Total Funding:
                </th>
                <td>
                  {hit.totalFunding || '?'}
                </td>
              </tr>
              <tr>
                <th className="text-end">
                  Offers Freemium:
                </th>
                <td>
                  {hit.hasFreemium || '--'}
                </td>
              </tr>
              <tr>
                <th className="text-end">
                  User Base:
                </th>
                <td>
                  {hit.sizeOfUserBase || '--'}
                </td>
              </tr>
              <tr>
                <th className="text-end">
                  Has On Prem?
                </th>
                <td>
                  {hit.hasOnPrem || '--'}
                </td>
              </tr>
              <tr>
                <th className="text-end">
                  Has Git?
                </th>
                <td>
                  {hit.hasVersioning || '--'}
                </td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>
    </article>
  );
}
