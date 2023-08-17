import * as API from 'api';
import { get } from 'api';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';
import { FormFeedback } from 'reactstrap';
const LivePreviewExample = ({
  form,
  setform,
  error,
  touch,
  name,
  onBlur,
  onError,
  component,
  placeholder,
  isMulti,
  toggle5,
  chargeboxId,
  userId,
  url,
  searchUrl,
  classes
}) => {
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState(null);
  const [results, setresults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [next, setNext] = useState(null);
  useEffect(() => {
    if (searchTerm !== '' && searchTerm !== null) {
      setIsLoading(true);
      const delayDebounceFn = setTimeout(async () => {
        if (component === 'connector') {
          const res = await get(`/${searchUrl}/?search=${searchTerm}`);
          setresults(
            res?.count !== 0
              ? res?.results?.push({
                  value: 'Create Connector',
                  label: 'Create Connector'
                }) &&
                  res?.results?.map((connector) => {
                    if (connector?.value) {
                      return connector;
                    }
                    return {
                      value: connector?.connectorId_pk,
                      label: connector?.connectorTypeName
                    };
                  })
              : [
                  {
                    value: 'Create Connector',
                    label: 'Create Connector'
                  }
                ]
          );
          setIsLoading(false);
        } else if (component === 'pricingPolicy') {
          const res = await get(`/${searchUrl}/?search=${searchTerm}`);
          setresults(
            res.count !== 0
              ? res.results.map((policy) => {
                  return {
                    value: policy?.paymentpolicyid,
                    label: policy?.profilename
                  };
                })
              : []
          );
          setIsLoading(false);
        } else if (component === 'chargebox') {
          const res = await get(`/${searchUrl}/?search=${searchTerm}`);
          setresults(
            res.count !== 0
              ? res.results.map((policy) => {
                  return {
                    value: policy?.chargeboxid,
                    label: policy?.chargeboxid
                  };
                })
              : []
          );
          setIsLoading(false);
        } else if (component === 'userGroup') {
          const res = await get(`/${searchUrl}/?search=${searchTerm}`);
          setresults(
            res 
              ? res.map((userGroup) => {
                  return {
                    value: userGroup?._id,
                    label: userGroup?.companyname
                  };
                })
              : []
          );
          setIsLoading(false);
        } else if (component === 'userEmail') {
          const res = await get(`/${searchUrl}?search=${searchTerm}`);
          setresults(
            res.count !== 0
              ? res.results.map((user) => {
                  return {
                    value: user?.idtag_fk,
                    label: user?.email
                  };
                })
              : []
          );
          setIsLoading(false);
        } else if (component === 'rates') {
          const res = await get(`/${searchUrl}?search=${searchTerm}`);
          setresults(
            res.count !== 0
              ? res?.results?.push({
                  value: 'Create Rates',
                  label: 'Create Rates'
                }) &&
                  res.results.map((rate) => {
                    if (rate?.value) {
                      return rate;
                    }
                    return {
                      value: rate?.rateid,
                      label: `Price ${rate?.profilepriceunit}`
                    };
                  })
              : [
                  {
                    value: 'Create Rates',
                    label: 'Create Rates'
                  }
                ]
          );
          setIsLoading(false);
        } else if (component === 'userTag') {
          const res = await get(`/${searchUrl}?user_id=${userId}`);
          setresults(
            res.count !== 0
              ? res.results.map((tag) => {
                  return {
                    value: tag?.tag_id,
                    label: tag?.tag_name
                  };
                })
              : []
          );
          setIsLoading(false);
        } else if (component === 'chargeBoxTag') {
          const res = await get(`/${searchUrl}?chargebox_id=${chargeboxId}`);

          setresults(
            res.count !== 0
              ? res.results.map((tag) => {
                  return {
                    value: tag?.tag_id,
                    label: tag?.tag_name
                  };
                })
              : []
          );
          setIsLoading(false);
        }
      }, 2000);
      return () => clearTimeout(delayDebounceFn);
    } else {
      if (component === 'connector') {
        setresults([
          {
            value: 'Create Connector',
            label: 'Create Connector'
          }
        ]);
      } else if (component === 'rates') {
        setresults([
          {
            value: 'Create Rates',
            label: 'Create Rates'
          }
        ]);
      } else {
        setresults([]);
      }
      setIsLoading(false);
    }
  }, [searchTerm]);

  const onChangeHandler = (e) => {
    if (e?.length > 0 && e.find((val) => val?.value === 'Create Connector')) {
      toggle5();
    } else if (e?.length > 0 && e[0].label === 'Create Rates') {
      history.push('/Add-Rates/new');
    } else {
      setform({
        ...form,
        [name]: e
      });
      setform(name, e);
    }
  };
  const onOpenHandler = async () => {
    try {
      setIsLoading(true);
      const res = await API.get(`/${url}`);
      if (url === 'connectors') {
        setresults([
          ...results,
          ...(res?.results?.length >= 0
            ? res.results.map((connector) => {
                return {
                  value: connector?.connectorId_pk,
                  label: connector?.connectorTypeName
                };
              })
            : [])
        ]);
      } else if (url === 'policies') {
        setresults(
          res?.results?.length >= 0
            ? res.results.map((policy) => {
                return {
                  value: policy?.paymentpolicyid,
                  label: policy?.profilename
                };
              })
            : []
        );
      } else if (url === 'company') {
        setresults(
          res
            ? res.map((company) => {
                return {
                  value: company._id,
                  label: company?.companyname
                };
              })
            : []
        );
      } else if (url === 'rates') {
        setresults(
          res?.results?.length >= 0
            ? res.results.map((policy) => {
                return {
                  value: policy?.rateid,
                  label: `Price ${policy?.profilepriceunit}`
                };
              })
            : []
        );
      } else if (url === 'chargeboxes') {
        setresults(
          res?.results?.length >= 0
            ? res.results.map((policy) => {
                return {
                  value: policy?.chargeboxid,
                  label: policy?.chargeboxid
                };
              })
            : []
        );
      } else if (url === 'policy-tags') {
        setresults(
          res?.results?.length >= 0
            ? res.results.map((policy) => {
                return {
                  value: policy?.tag_id,
                  label: policy?.tag_name
                };
              })
            : []
        );
      } else if (url === 'search-usersby-email') {
        setresults(
          res?.results?.length >= 0
            ? res.results.map((policy) => {
                return {
                  value: policy?.idtag_fk,
                  label: policy?.email
                };
              })
            : []
        );
      }
      // setresults(
      //   res?.results?.length >= 0
      //     ? res.results.map((policy) => {
      //         return {
      //           value: policy?.paymentpolicyid,
      //           label: policy?.profilename
      //         };
      //       })
      //     : []
      // );
      setNext(res?.next);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onMenuScrollToBottomHandler = async () => {
    try {
      if (next) {
        setIsLoading(true);

        const res = await API.get(`/${url}/?${next.split('?')[1]}`);

        if (url === 'connectors') {
          if (res?.results?.length >= 0) {
            setresults([
              ...results,
              ...res?.results?.map((policy) => {
                return {
                  value: policy?.connectorId_pk,
                  label: policy?.connectorTypeName
                };
              })
            ]);
          }
        } else if (url === 'policies') {
          if (res?.results?.length >= 0) {
            setresults([
              ...results,
              ...res?.results?.map((policy) => {
                return {
                  value: policy?.paymentpolicyid,
                  label: policy?.profilename
                };
              })
            ]);
          }
        } else if (url === 'companies') {
          if (res?.results?.length >= 0) {
            setresults([
              ...results,
              ...res?.results?.map((policy) => {
                return {
                  value: policy?.c_id,
                  label: policy?.company_name
                };
              })
            ]);
          }
        } else if (url === 'rates') {
          if (res?.results?.length >= 0) {
            setresults([
              ...results,
              ...res?.results?.map((policy) => {
                return {
                  value: policy?.rateid,
                  label: `Price ${policy?.profilepriceunit}`
                };
              })
            ]);
          }
        } else if (url === 'chargeboxes') {
          if (res?.results?.length >= 0) {
            setresults([
              ...results,
              ...res?.results?.map((policy) => {
                return {
                  value: policy?.chargeboxid,
                  label: policy?.chargeboxid
                };
              })
            ]);
          }
        } else if (url === 'policy-tags') {
          if (res?.results?.length >= 0) {
            setresults([
              ...results,
              ...res?.results?.map((policy) => {
                return {
                  value: policy?.tag_id,
                  label: policy?.tag_name
                };
              })
            ]);
          }
        } else if (url === 'search-usersby-email') {
          if (res?.results?.length >= 0) {
            setresults([
              ...results,
              ...res?.results?.map((policy) => {
                return {
                  value: policy?.idtag_fk,
                  label: policy?.email
                };
              })
            ]);
          }
        }

        // if (res?.results?.length >= 0) {
        //   setresults([
        //     ...results,
        //     ...res?.results?.map((policy) => {
        //       return {
        //         value: policy?.paymentpolicyid,
        //         label: policy?.profilename
        //       };
        //     })
        //   ]);
        // }
        setNext(res?.next);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updatedResults = isLoading
    ? [...results, { value: 'loading', label: 'Loading....', disabled: true }]
    : results;
  return (
    <>
      {isMulti ? (
        <Select
          isSearchable
          isMulti
          name={name}
          onBlur={(value) => {
            onBlur(name, true);
            onError(name, value.error);
          }}
          onMenuScrollToBottom={onMenuScrollToBottomHandler}
          onInputChange={(e) => {
            setSearchTerm(e);
          }}
          onFocus={onOpenHandler}
          placeholder={placeholder}
          value={form}
          onChange={onChangeHandler}
          options={updatedResults}
          cacheOptions={true}
          noOptionsMessage={() => 'No Results Found'}
          theme={(theme) => ({
            ...theme,
            borderRadius: '0.29rem',
            borderWidth: 1,
            colors: {
              ...theme.colors,
              primary25: 'rgba(60,68,177,0.15)',
              primary50: 'rgba(60,68,177,0.15)',
              primary: '#3c44b1'
            }
          })}
        />
      ) : (
        <Select
          className={classes}
          isSearchable
          name={name}
          onBlur={() => onBlur(name, true)}
          onInputChange={(e) => {
            setSearchTerm(e);
          }}
          placeholder={placeholder}
          onMenuScrollToBottom={onMenuScrollToBottomHandler}
          value={form}
          onFocus={onOpenHandler}
          onChange={onChangeHandler}
          options={updatedResults}
          cacheOptions={true}
          noOptionsMessage={() => 'No Results Found'}
          isLoading={isLoading}
          theme={(theme) => ({
            ...theme,
            borderRadius: '0.29rem',
            borderWidth: 1,
            colors: {
              ...theme.colors,
              primary25: 'rgba(60,68,177,0.15)',
              primary50: 'rgba(60,68,177,0.15)',
              primary: '#3c44b1'
            }
          })}
        />
      )}
      {!!error && touch && (
        <FormFeedback className="d-block">{error}</FormFeedback>
      )}
    </>
  );
};
export default LivePreviewExample;
