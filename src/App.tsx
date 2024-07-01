import React, { useState, useEffect } from 'react';
import algoliasearch from 'algoliasearch/lite';
import fallbackImage from './assets/no-logo.png';
import fallbackAvatarImage from './assets/missing-avatar.jpeg';
import LegendModal from './Modal_Legend';

import PopoverExample from './components/popover-uth.js';
//   <PopoverExample />

// const popover_uth = (
//   <Popover id="popover-basic">
//     <Popover.Header as="h3">Under the Hood</Popover.Header>
//     <Popover.Body>
//       <p>
//         These are features that you are going to want,
//         after you get it all setup, and your stackholders 
//         start to weight in. 
//       </p>
//       <p>
//         For Example, can we get messages sent to slack? Or 
//         do we need to have a dev code up this message integration?
//       </p>
//       <p>
//         Basically these are features you did not assess for when 
//         looking for the solution, but post purchase will love 
//         for the time saving.
//       </p>
//     </Popover.Body>
//   </Popover>
// );

import {
  Configure,
  Highlight,
  Hits,
  InstantSearch,
  Pagination,
  SearchBox,
  RefinementList,
  CurrentRefinements,
  useRefinementList,
  useRange,

  Stats
} from 'react-instantsearch';

import type { Hit } from 'instantsearch.js';
import './App.css';

const CustomNumericRangeSlider = ({ attribute, defaultMin, defaultMax  }) => {
  const { range, start, refine } = useRange({ attribute });
  const [minValue, setMinValue] = useState(defaultMin);
  const [maxValue, setMaxValue] = useState(defaultMax);

  // Set the default values when the component mounts
  useEffect(() => {
    if (defaultMin !== undefined && defaultMax !== undefined) {
      refine([defaultMin, defaultMax]);
    }
  }, [defaultMin, defaultMax, refine]);

  const handleMinChange = (e) => {
    const value = Number(e.target.value);
    setMinValue(value);
    refine([value, maxValue]);
  };

  const handleMaxChange = (e) => {
    const value = Number(e.target.value);
    setMaxValue(value);
    refine([minValue, value]);
  };

  return (
    <div>
      <div>
        <label>From: {minValue}</label>
        <br/>
        <input
          type="range"
          min={range.min}
          max={range.max}
          value={minValue}
          className="form-range"
          onChange={handleMinChange}
        />
      </div>
      <div>
        <label>To: {maxValue}</label>
        <br/>
        <input
          type="range"
          min={range.min}
          max={range.max}
          value={maxValue}
          className="form-range"
          onChange={handleMaxChange}
        />
      </div>
    </div>
  );
};

const CustomDropdownRefinementList = ({ attribute }) => {
  const { items, refine } = useRefinementList({ attribute });

  return (
    <select
      onChange={(event) => {
        const value = event.target.value;
        refine(value === '' ? [] : [value]);
      }}
      defaultValue=""
      className="form-control"
    >
      <option value="">All</option>
      {items.map(item => (
        <option key={item.value} value={item.value}>
          {item.label} ({item.count})
        </option>
      ))}
    </select>
  );
};

const searchClient = algoliasearch(
  'C0Z1GERTE7',
  '3cc4a85c3098596586c821150e8dc563'
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

  // localStorage.setItem('alreadySeenModal', 'no');

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeTheModal = () => {
    localStorage.setItem('alreadySeenModal', 'yes');
    setIsModalOpen(false);
  };

  try {
    setTimeout(() => {
      const alreadySeenModal = localStorage.getItem('alreadySeenModal') || 'no';
      if (alreadySeenModal === 'no') {
        setIsModalOpen(true);
      }
    }, 1000);
  } catch (err) {
    console.log('Small error')
  }

  return (
    <div>

      <LegendModal
        isOpen={isModalOpen}
        onRequestClose={() => closeTheModal()}
      />

      <InstantSearch
        searchClient={searchClient}
        indexName="Cookbook"
        future={future}
        routing={true}
      >

        <header className="header">
          <h1 className="header-title">
            Low Code Cookbook
            <Stats />
          </h1>
          <button className="btn btn-sm btn-outline-light avatar-btn headerBtn" onClick={openModal}>
            And Why?
          </button>
        </header>

        <div className="container-fluid">

          <Configure hitsPerPage={25} />

          {/* <PopoverExample /> */}

          <div className="row">
            <div className="col-3 d-none d-md-block d-lg-block">

              <div className="filter-el">
                <h4>
                  Stack Need:
                </h4>
                <RefinementList searchable="true" operator="and" searchablePlaceholder="Enter a feature..." attribute="services" limit="20" />
              </div>

              <div className="filter-el">
                <h4>
                  Type of Solution:
                </h4>
                <RefinementList searchable="true" attribute="type" searchablePlaceholder="Enter type..." limit="10" />
              </div>

              <div className="filter-el">
                <h4>
                  Under the Hood:

                  {/* <OverlayTrigger trigger="click" placement="right" overlay={popover_uth}>
                     <FaInfoCircle size={10} style={{ cursor: 'pointer' }} />
                  </OverlayTrigger> */}

                </h4>
                <RefinementList searchable="true" attribute="secondaryServices" searchablePlaceholder="Enter type..." limit="10" />
              </div>

              <div className="filter-el">
                <h4>
                  Status:
                </h4>
                <RefinementList attribute="reviewStatus"/>
              </div>

              <div className="filter-el">
                <h4>
                  Year Founded:
                  <button type="button" class="btn btn-lg btn-danger" data-bs-toggle="popover" title="Popover title" data-bs-content="And here's some amazing content. It's very engaging. Right?">Click to toggle popover</button>

                </h4>
                <CustomDropdownRefinementList attribute="founded" />
                {/* 
                  <CustomNumericRangeSlider attribute="founded" defaultMin={2000} defaultMax={2025} />
                  <RefinementList attribute="founded" />
                */}
              </div>

              {/* <div className="filter-el">
                <h4>
                  Total Funds Raised:
                </h4>
                <RefinementList attribute="totalFunding" />
              </div> */}

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
              <SearchBox placeholder="Stack problem..." className="searchbox" />
              <CurrentRefinements />
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

// Uses the new github driven CDN.
const base = 'https://less-code.twic.pics/logos-v2';
// const base = 'https://raw.githubusercontent.com/d1b1/less-code-tools/master/data/logos/recEmdrByNBcnq3cj.png';

// This can be removed as twicPic supports failback images.
function ImageWithFallback({ src, alt, classname, ...props }) {
  const handleError = (e) => {
    e.target.src = fallbackImage;
  };

  const imageUrl = base + '/' + src + '';
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
              <br/>

              <small className="clearfix">
                <b>Services:</b> {(hit.services || ['TBD']).join(', ')}
              </small>
              <small className="clearfix">
                <b>NTHs:</b> {(hit.secondaryServices || ['TBD']).join(', ')}
              </small>
              <small className="clearfix">
                <b>Type:</b> {(hit.type || []).join(', ')} 
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
