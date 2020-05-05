import React, { useState, useEffect, Suspense } from "react"
import styled from "styled-components"
import { useWeb3React } from "@web3-react/core"
import {
  useENSName,
  // useBoxStorage,
  // useNotificationThread,
  // useThreadPosts,
} from "../../hooks"
import { Link } from "../../theme/components"
import { Text } from "rebass"
import Spinner from "../Spinner"
import useMedia from "use-media"
import { useQuests } from "../../contexts/Application"
import { financeTrack, gamingTrack } from "../../quests"
import { AutoColumn } from "../../components/Column"
import { AutoRow, RowFixed, RowBetween } from "../../components/Row"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 65%;
  margin: auto;
  align-items: flex-start;
  justify-content: center;
  padding-top: ${({ theme }) => theme.bigPadding};

  @media (max-width: 1200px) {
    width: 80%;
  }

  @media (max-width: 970px) {
    width: 90%;
  }

  @media (max-width: 550px) {
    with: 100%;
    padding-top: 5px;
  }
`

const Section = styled.div`
  display: grid;
  grid-template-areas: "header header" \n"gutter quests";
  grid-template-columns: 21px auto;
  grid-template-rows: 115px auto;
  width: 100%;

  @media (max-width: 525px) {
    grid-template-areas: "header header" \n"quests quests";
  }
`

const Heading = styled.div`
  grid-area: header;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  font-size: 24px;
  height: 80px;
  font-weight: bold;
  margin-top: 15px;
  margin-bottom: 2rem;

  & > div > span {
    display: block;
    font-size: 16px;
    margin-top: 5px;
    color: #a1a4b1;
  }

  @media (max-width: 550px) {
    text-align: center;
    width: 75%;
    margin: auto;
  }
`

const Gutter = styled.div`
  grid-area: gutter;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
`

const Quest = styled.div`
  width: calc(100%-40px);
  font-size: 14px;
  font-weight: 600;
  background-color: #1f1f1f;
  border: 1px solid ${({ theme }) => theme.outlinePurple};
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;

  &:hover {
    cursor: pointer;
    background-color: #141516;
  }

  &:first-of-type {
    margin-top: 10px;
  }
`

const BlurbWrapper = styled.div`
  width: fit-content;

  @media (max-width: 670px) {
    width: 200px;
    font-weight: bold;
  }
`

const Collapser = styled.img`
  grid-area: exp;
  margin: auto;
  height: 15px;
  width: 8px;
  transform: rotate(${({ isOpen }) => (isOpen ? "none" : "-90deg")});
`

const Icon = styled.div`
  grid-area: icon;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #343434;
  height: 40px;
  width: 40px;
  border-radius: 50%;

  & > * {
    height: 32px;
    width: 32px;
    border-radius: 50%;
  }

  @media (max-width: 970px) {
    margin-left: 1rem;
  }

  @media (max-width: 525px) {
    margin-left: 0.5rem;
  }
`

const Platform = styled.div`
  font-size: 12px;
  font-weight: bold;
  color: ${({ color }) => color};
  text-transform: uppercase;
`

const Track = styled.div`
  grid-area: track;
  padding: 0 14px;
  display: flex;
  width: 70px;
  height: 24px;
  font-size: 16px;
  color: rgba(245, 245, 253, 1);
  background-color: ${({ color }) => color};
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  white-space: nowrap;
`

const QuestWrapper = styled.div`
  grid-area: quests;
`

const QuestOverview = styled.div`
  grid-area: main;
  width: 100%;
  padding-left: 15px;
`

const Points = styled.div`
  grid-area: points;
  border: 1px solid rgba(141, 251, 201, 0.4);
  border-radius: 15px;
  color: #8DFBC9;
  height: 27px;
  width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 10px;
  font-family: Inter;
  font-size 13px;
  font-weight: bold;
  white-space: nowrap;
`

const QuestType = styled.div`
  grid-area: type;
`

const Loading = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const Footer = styled.div`
  height: 100px;

  media (max-width: 550px) {
    height: 30px;
  }
`

export default function QuestSection({ account }) {
  const [weeklyQuests, setWeeklyQuests] = useState([])

  const [sideQuests, setSideQuests] = useState([])

  const ENSName = useENSName(account)

  // const userSpace = useBoxStorage(account, global.web3.currentProvider)

  // const notificationThread = useNotificationThread(userSpace, account)

  // const notificationPosts = useThreadPosts(notificationThread)

  const [OpenQuest, setOpenQuest] = useState()

  const quests = useQuests()

  const isExtraSmall = useMedia({ maxWidth: "970px" })

  const isXXSmall = useMedia({ maxWidth: "930px" })

  const isBelow600 = useMedia({ maxWidth: "600px" })

  const root0 = "COMP-101"
  const root1 = "KITTY-101"

  useEffect(() => {
    let weeklyQuests = 0
    let sideQuests = 0
    quests &&
      quests.map((quest) => {
        if (quest.type === "weekly" && quest.progress < 100) {
          weeklyQuests += 1
        }
        if (quest.type === "side-quest" && quest.progress < 100) {
          sideQuests += 1
        }
        return true
      })
    setSideQuests(sideQuests)
    setWeeklyQuests(weeklyQuests)
  }, [ENSName, account, quests])

  const [formattedQuests, setFormattedQuests] = useState()

  useEffect(() => {
    if (quests) {
      const newFormatted = {}
      quests.map((quest) => {
        return (newFormatted[quest.name] = quest)
      })
      setFormattedQuests(newFormatted)
    }
  }, [quests])

  function renderQuest(quest, locked, track) {
    return (
      quest && (
        <>
          {quest?.progress < 100 && !locked && (
            <QuestItem quest={quest} key={quest.name} />
          )}
          {formattedQuests &&
            track[quest?.name]?.children &&
            track[quest?.name]?.children?.map((childQuest) => {
              return renderQuest(
                formattedQuests[childQuest],
                !(quest?.progress >= 100 && !locked),
                track
              )
            })}
        </>
      )
    )
  }

  const QuestItem = ({ quest }) => (
    <Quest
      key={quest.name}
      isOpen={OpenQuest === quest}
      onClick={() => {
        if (OpenQuest === quest) {
          setOpenQuest(null)
        } else {
          setOpenQuest(quest)
        }
      }}
    >
      <AutoColumn gap="20px">
        <RowBetween>
          <RowFixed>
            <Collapser
              isOpen={OpenQuest === quest}
              src={require("../../assets/images/carat.svg")}
            />
            <Icon style={{ marginLeft: "10px" }}>
              <img
                src={require("../../assets/images/" + quest?.imgPath)}
                alt=""
              />
            </Icon>
          </RowFixed>
          <QuestOverview>
            <Platform color={quest.categoryColor}>{quest.name}</Platform>
            <BlurbWrapper>{quest.blurb}</BlurbWrapper>
          </QuestOverview>
          <AutoRow gap="10px" style={{ justifyContent: "flex-end" }}>
            <div>{!isExtraSmall && quest.progress.toFixed(1) + "%"}</div>
            <Points>{quest.points} XP</Points>
          </AutoRow>
        </RowBetween>
        {OpenQuest === quest && (
          <AutoColumn gap="20px">
            <Text color="#CFCFCF">{quest.description}</Text>
            <RowBetween>
              <Link
                href={quest.resource}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Text color="#6FCF97">{quest.resource}</Text>
              </Link>
              <Text>{quest.platform}</Text>
            </RowBetween>
          </AutoColumn>
        )}
      </AutoColumn>
    </Quest>
  )

  return (
    <Suspense fallback={null}>
      {quests.length > 0 ? (
        <Wrapper>
          {weeklyQuests > 0 && (
            <Section>
              <Heading>
                <div>
                  Weekly Quests
                  <span>Complete these challenges before they expire</span>
                </div>
              </Heading>
              {!isXXSmall ? <Gutter /> : null}
              <QuestWrapper>
                {quests
                  .sort((a, b) => {
                    if (a?.points >= b?.points) {
                      return -1
                    } else {
                      return 1
                    }
                  })
                  .map((quest, i) => {
                    if (quest.type === "weekly" && quest.progress < 100) {
                      return <QuestItem quest={quest} />
                    }
                    return true
                  })}
              </QuestWrapper>
            </Section>
          )}
          <Section>
            <Heading>
              <div>
                Active Quests
                <span>
                  Complete these quests to move onto the next level in its
                  track. View your current journey on the Progress page.
                </span>
              </div>
            </Heading>
            {!isXXSmall && <Gutter />}
            <QuestWrapper>
              {formattedQuests &&
                renderQuest(formattedQuests[root0], false, financeTrack)}
              {formattedQuests &&
                renderQuest(formattedQuests[root1], false, gamingTrack)}
            </QuestWrapper>
          </Section>
          {sideQuests > 0 && (
            <Section>
              <Heading>
                <div>
                  Bonus Challenges
                  <span>Complete these challenges before they expire</span>
                </div>
              </Heading>
              {!isXXSmall && <Gutter />}
              <QuestWrapper>
                {quests.map((quest, i) => {
                  if (quest.type === "side-quest" && quest.progress < 100) {
                    return <QuestItem quest={quest} />
                  }
                  return true
                })}
              </QuestWrapper>
            </Section>
          )}
          <Footer />
        </Wrapper>
      ) : (
        <Loading>
          <Spinner />
        </Loading>
      )}
    </Suspense>
  )
}
