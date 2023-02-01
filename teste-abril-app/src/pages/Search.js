
import React, { useState, Fragment } from 'react'
import { useNavigation } from '@react-navigation/native';
import {
  ActivityIndicator,
  StatusBar,
  View,
} from 'react-native';
import api from '../service/Api';
import {
  ViewContainer,
  FlatListRepositories,
  IconArrowRightToDetails,
  IconSearch,
  ImageProfileRepo,
  SectionFormView,
  TextTitle,
  TextDetailsLogin,
  TextDetailsRepositoryName,
  TextLoading,
  TextSearchInput,
  TouchableOpacityDetailsRepo,
  ViewArrowToDetailsRepo,
  ViewDividerRepos,
  ViewRepositoryNameAndLogin,
  ViewSearch,
  ViewTitle,
  ViewLoadingData,
  TextStarts
} from '../components/stylesSearch';

function Search() {
  const { navigate } = useNavigation()

  const [repositorySearch, setRepositorySearch] = useState('')

  const [responseRepos, setResponseRepos] = useState([])
  const [countResponseRepos, setCountResponseRepos] = useState('')
  const [pageResponseRepos, setPageResponseRepos] = useState(0)

  const [loadingRepos, setLoadingRepos] = useState(false)

  const LIMIT_PAGE = 100


  async function handleSearch(type) {

    if (repositorySearch === '' || repositorySearch === undefined) {
      return
    }

    if (loadingRepos) {
      return
    }


    let pageNumber = 1

    switch (type) {
      case 'HANDLE_FORM':
        setResponseRepos([])
        setCountResponseRepos('')
        setPageResponseRepos(pageNumber)
        break

      case 'HANDLE_PAGE':
        if (responseRepos.length === countResponseRepos) {
          return
        }

        pageNumber = (pageResponseRepos + 1)
        break
    }

    setPageResponseRepos(pageNumber)

    setLoadingRepos(true)

    const response = await api.get(`repositories?q=${repositorySearch}&sort=help-wanted-issues&order=desc&page=${pageNumber}&per_page=${LIMIT_PAGE}`, {
      "Accept": "application/vnd.github.v3+json"
    })

    const { total_count, items } = response.data

    setLoadingRepos(false)

    switch (type) {
      case 'HANDLE_FORM':
        setResponseRepos(items)
        break

      case 'HANDLE_PAGE':
        setResponseRepos([...responseRepos, ...items])
        break
    }

    setCountResponseRepos(total_count)

  }

  const Repository = ({ item }) => {

    return (
      <View style={{
        height: 70,
      }}>

        <TouchableOpacityDetailsRepo
          onPress={() => navigate('Repository', {
            urlDetail: item.html_url
          })
          }
        >

          <View style={{ flexDirection: 'row' }}>
            <ImageProfileRepo source={{ uri: item.owner.avatar_url }} />
          </View>

          <ViewRepositoryNameAndLogin>
            <TextDetailsRepositoryName> {item.name} </TextDetailsRepositoryName>
            <TextDetailsLogin> {item.owner.login} </TextDetailsLogin>
          </ViewRepositoryNameAndLogin>

          <ViewArrowToDetailsRepo>
            <IconArrowRightToDetails name="star" color="#ddd" size={18} />
            <TextStarts>{item.stargazers_count}</TextStarts>
          </ViewArrowToDetailsRepo>

        </TouchableOpacityDetailsRepo>

        <ViewDividerRepos />
      </View>
    )

  }

  return (
    <>
      <StatusBar barStyle="dark-content" />

      <Fragment>
        <ViewTitle>
          <TextTitle>
            Repositórios
          </TextTitle>
        </ViewTitle>

        <ViewSearch>

          <SectionFormView>
            <IconSearch name="search" color="#ddd" size={16} />

            <TextSearchInput
              placeholder="Busca por repositórios"
              underlineColorAndroid="transparent"
              value={repositorySearch}
              onChangeText={e => setRepositorySearch(e)}
              onSubmitEditing={async () => await handleSearch('HANDLE_FORM')}
            />
          </SectionFormView>

        </ViewSearch>


        <FlatListRepositories
          data={responseRepos}
          renderItem={Repository}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={async () => handleSearch('HANDLE_PAGE')}
          onEndReachedThreshold={0.1}
          ListFooterComponent={<ActivityIndicator />}
        />


        <ViewLoadingData>
          {(loadingRepos) ?
            <TextLoading>
              Carregando Repositórios. Por favor, espere...
            </TextLoading>
            :
            <TextLoading>
              {(responseRepos.length > 0) ? `${responseRepos.length}/${countResponseRepos}` : ``}
            </TextLoading>
          }
        </ViewLoadingData>
      </Fragment>
    </>
  )
}

export default Search;