import React, { Suspense } from "react"
import styled from "styled-components"
import { HashRouter, Redirect, Route, Switch } from "react-router-dom"

import Web3ReactManager from "../components/Web3ReactManager"
// import { useWeb3React } from "@web3-react/core"
import Nav from "../components/Nav"
import AltHome from "../components/AltHome"
import Progress from "../pages/Progress"
import ActivityHistory from "../components/ActivityHistory"
import Rewards from "../components/Rewards"
import FAQ from "../components/Faq"

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  min-height: 100vh;
  height: 100%;
  width: 100%;
`

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: flex-start;
  align-items: flex-start;
  flex: 1;
  overflow: auto;
`

export default function App() {
  // const { account } = useWeb3React()

  return (
    <>
      <Suspense fallback={null}>
        <AppWrapper>
          <BodyWrapper>
            <Web3ReactManager>
              <HashRouter>
                <Nav />
                <Suspense fallback={null}>
                  <Switch>
                    <Route
                      exact
                      strict
                      path="/activity"
                      component={() => <ActivityHistory />}
                    />
                    <Route
                      exact
                      strict
                      path="/"
                      component={() => <AltHome />}
                    />
                    <Route
                      exact
                      strict
                      path="/progress"
                      component={() => <Progress />}
                    />
                    <Route exact string path="/faq" component={() => <FAQ />} />
                    <Redirect to="/" />
                    <Route path="/rewards" component={() => <Rewards />} />
                  </Switch>
                </Suspense>
              </HashRouter>
            </Web3ReactManager>
          </BodyWrapper>
        </AppWrapper>
      </Suspense>
    </>
  )
}
