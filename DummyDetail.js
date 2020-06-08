import React, { PureComponent } from 'react'
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native'

export default class DummyDetail extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      detailPageData: false,
      similarData: false,
      recommendedData: false,
      start: Date.now()
    }
  }

  componentDidMount() {
    this.startTime()
    this.fetchDetailPageData()
    this.fetchSimilarData()
    this.fecthRecommendedData()
  }

  fetchDetailPageData = () => (
    fetch('https://newprojects.housing.com/api/v3/new-projects/51839/android')
      .then(response => response.json())
      .then((json) => {
        this.setState({
          detailPageData: true
        })
        return json
      })
      .catch((error) => {
        console.error(error)
      })
  )

  fetchSimilarData = () => (
    fetch('https://search.housing.com/api/v2/buy/similar-properties?limit=50&project_id=51839')
      .then(response => response.json())
      .then((json) => {
        this.setState({
          similarData: true
        })
        return json
      })
      .catch((error) => {
        console.error(error)
      })
  )

  fecthRecommendedData = () => (
    fetch('https://regions.housing.com/api/v1/establishment/filter?f=eyJsYXQiOjE5LjEyMzUzNywibG5nIjo3Mi44OTU5NTgsInR5cGUiOlsiYnVzX3N0YXRpb24iLCJhaXJwb3J0IiwidHJhaW5fc3RhdGlvbiIsImJhbmtfYXRtIiwiaG9zcGl0YWwiLCJncm9jZXJ5IiwicGhhcm1hY3kiLCJyZXN0YXVyYW50cyIsImJhcl9uaWdodF9jbHViIiwibW92aWVfdGhlYXRlciIsInBhcmsiLCJzaG9wcGluZ19tYWxsIl0sInJhZGl1cyI6MzAwMCwibWF4X2NvdW50Ijo1LCJncm91cF9ieSI6ImVzdGFibGlzaG1lbnRfdHlwZSJ9&source=android')
      .then(response => response.json())
      .then((json) => {
        this.setState({
          recommendedData: true
        })
        return json
      })
      .catch((error) => {
        console.error(error)
      })
  )

  renderIsLoadingOrNot = () => (
    <View>
      <Text>
        {`Still Loading Data : ${this.state.detailPageData && this.state.similarData && this.state.recommendedData}`}
      </Text>
      {this.state.detailPageData && this.state.similarData && this.state.recommendedData && (
        <Text>
          {`Time Taken ${Date.now()-this.state.start}`}
        </Text>
      )}
    </View>
  )

  renderHeader = () => (
    <View style={{ height: 30, flexDirection: 'row' }}>
      <TouchableOpacity
        onPress={() => { alert('backButtonPressed') }}
        style={{ heigth: 15, width: 15, backgroundColor: 'black' }}
      >
        <Text style={{ fontColor: 'white' }}>Back button</Text>
      </TouchableOpacity>
      <Text>Detail Page</Text>
    </View>
  )

  render() {
    return (
      <View>
        {this.renderHeader()}
        {this.renderIsLoadingOrNot()}
      </View>
    )
  }
}