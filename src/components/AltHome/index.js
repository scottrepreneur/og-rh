import React from "react"
import styled from "styled-components"
import QuestSection from "../QuestSection"
import { useWeb3React } from "@web3-react/core"
import { AutoColumn } from "../Column"
import { Text, Button } from "rebass"
import { RowBetween, RowFixed } from "../Row"
import { useWalletModalToggle } from "../../contexts/Application"
import { Link } from "../../theme/components"
// import { isAddress } from "../../utils"

// import { ensClient } from "../../apollo/client"
// import { ENS_QUERY } from "../../apollo/queries"
// import useMedia from 'use-media'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const LoggedOut = styled.div`
  margin-top: 200px
  padding-left: 20%;
  width: 60%;
`

// const StyledInput = styled.div`
//   width: 393px;
//   position: relative;
//   border-radius: 8px;
//   margin-right: 60px;

//   > input {
//     padding: 20px;
//     border: 0;
//     width: 100%;
//     font-size: 1rem;
//     background-color: #2d2d2d;
//     color: white;
//     border-radius: 4px;
//     border: 1px solid transparent;

//     :focus {
//       outline: none;
//       border: 1px solid #6fcf97;
//     }
//   }
// `

// const StyledButton = styled(Button)`
//   background-color: #6fcf97;
//   color: white;
//   > * {
//     font-weight: 1000;
//   }

//   :focus {
//     outline: none;
//   }

//   :hover {
//     cursor: ${({ disabled }) => !disabled && "pointer"};
//     background-color: ${({ disabled }) => !disabled && "#3e865c"};
//   }

//   opacity: ${({ disabled }) => disabled && 0.4};
// `

const StyledButtonDark = styled(Button)`
  background-color: white;
  color: black;
  > * {
    font-weight: 1000;
  }

  :focus {
    outline: none;
  }

  :hover {
    cursor: pointer;
    background-color: #dcdcdc;
  }
`

const Logo = styled.img`
  width: 150px;
`

export default function AltHome() {
  const { account } = useWeb3React()

  const toggleWalletModal = useWalletModalToggle()

  // const isSmall = useMedia({ maxWidth: '940px' })

  // const [metaAccount, setMetaAccount] = useState()

  // const [typed, setTyped] = useState("")
  // const [valid, setValid] = useState(false)
  // const [ensName, setEnsName] = useState()

  // function handleType(val) {
  //   setTyped(val)
  // }

  // useEffect(() => {
  //   async function check() {
  //     setValid(false)
  //     let result = await ensClient.query({
  //       query: ENS_QUERY,
  //       fetchPolicy: "cache-first",
  //       variables: {
  //         name: typed,
  //       },
  //     })
  //     const owner = result?.data?.domains[0]?.owner?.id
  //     if (isAddress(owner)) {
  //       setValid(true)
  //       setEnsName(owner)
  //     } else {
  //       setEnsName()
  //     }
  //     if (isAddress(typed)) {
  //       setValid(true)
  //     }
  //   }
  //   check()
  // }, [account, typed])

  // useEffect(() => {
  //   async function check() {
  //     if (account) {
  //       setMetaAccount(account)
  //     }
  //   }
  //   check()
  // }, [account, typed])

  return (
    <Wrapper>
      {account ? (
        <QuestSection account={account} />
      ) : (
        <LoggedOut>
          <AutoColumn gap="40px">
            <Logo
              src={require("../../assets/images/rabbithole.png")}
              alt="rabbithole logo"
            />
            <Text fontSize="30px" fontWeight={1000}>
              Adventure into the world of crypto and get rewarded for using it.
            </Text>
            <RowBetween>
              {/* <StyledInput>
                <input
                  placeholder={"Enter a valid Ethereum address"}
                  value={typed}
                  onChange={(e) => handleType(e.target.value)}
                />
              </StyledInput>
              <StyledButton
                height="60px"
                width="100px"
                disabled={!valid}
                onClick={() =>
                  ensName ? setMetaAccount(ensName) : setMetaAccount(typed)
                }
              >
                <Text fontSize="20px" fontWeight={1000}>
                  Enter
                </Text>
              </StyledButton>
              <Text fontWeight={800} marginLeft={"20px"}>
                or
              </Text> */}
              <StyledButtonDark
                height="60px"
                width="300px"
                onClick={() => toggleWalletModal()}
              >
                <Text fontSize="20px" fontWeight={600} color="black">
                  Connect a wallet to enter
                </Text>
              </StyledButtonDark>
            </RowBetween>
            <Link href="/faq">
              <Text color="#6fcf97">Have questions?</Text>
            </Link>
            <RowFixed>
              <a
                href="https://twitter.com/rabbithole_gg"
                target="_blank"
                style={{ textDecoration: "none" }}
              >
                <Text color="#6fcf97">Twitter</Text>
              </a>
              <a
                href="https://discord.gg/V7WMqbs"
                style={{ marginLeft: "10px", textDecoration: "none" }}
                target="_blank"
              >
                <Text color="#6fcf97">Discord</Text>
              </a>
            </RowFixed>
          </AutoColumn>
        </LoggedOut>
      )}
    </Wrapper>
  )
}
